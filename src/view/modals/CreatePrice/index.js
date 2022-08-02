import JsonReactform from 'json-reactform';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Modal, ModalBody } from 'reactstrap';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { MdOutlineClose } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { globalOpenedModalKeyAtom, globalRefreshHashAtom } from '../../../stores/global/atoms';
import Button from '../../../components/atoms/Button';
import './styles.scss';
import useGetAreaList from '../../../services/queries/useGetAreaList';
import useGetOptionList from '../../../services/queries/useGetOptionList';
import usePostCreatePrice from '../../../services/mutations/usePostCreatePrice';
import LoadingOverlay from '../../../components/molecules/LoadingOverlay';
import moment from 'moment';

const CreatePriceModal = () => {
  const [openedModalKey, setOpenedModalKey] = useRecoilState(globalOpenedModalKeyAtom);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [alertData, setAlertData] = useState(null);
  const { data } = useGetAreaList();
  const { data: sizeData } = useGetOptionList('size');
  const { mutate, isLoading } = usePostCreatePrice();
  const setRefreshHash = useSetRecoilState(globalRefreshHashAtom);

  const toggle = () => {
    setOpenedModalKey(null);
  };

  useEffect(() => {
    if (alertData) {
      setTimeout(() => {
        setAlertData(null);
      }, 3000);
    }
  }, [alertData]);

  const onSubmit = (values) => {
    const id = uuidv4();
    const params = {
      uuid: id,
      komoditas: values?.['Fish Name'],
      area_provinsi: values?.Province?.value,
      area_kota: values?.City?.value,
      size: values?.Size?.value,
      price: parseInt(values?.price),
      tgl_parsed: moment().format(),
      timestamp: moment().valueOf()
    };
    mutate(params, {
      onSuccess: () => {
        setRefreshHash(Math.random() * 10);
        setAlertData({
          message: 'Successfully Add new Fish Price'
        });
      },
      onError: () => {
        setAlertData({
          color: 'danger',
          message: 'There is an error, please try again'
        });
      }
    });
  };

  const provinceOptions = useMemo(
    () =>
      data?.province?.map((item) => ({
        label: item?.province,
        value: item?.province
      })),
    [data?.province]
  );

  const cityOptions = useMemo(
    () =>
      data?.city
        ?.filter?.((item) => (selectedProvince ? item?.province === selectedProvince : true))
        ?.map((item) => ({
          label: item?.city,
          value: item?.city
        })),
    [selectedProvince, data?.city]
  );

  return (
    <Modal
      isOpen={openedModalKey === 'MODAL_CREATE_PRICE'}
      toggle={toggle}
      backdrop
      fullscreen={window.innerWidth <= 480}>
      <div className="modal-header-container">
        <div className="modal-title">Add Fish Price Form</div>
        <Button variant="danger" onClick={toggle}>
          <MdOutlineClose />
        </Button>
      </div>
      <LoadingOverlay loading={isLoading}>
        <Alert isOpen={!!alertData} color={alertData?.color}>
          {alertData?.message}
        </Alert>
        <ModalBody>
          <JsonReactform
            model={{
              'Fish Name': {
                type: 'text',
                required: true
              },
              Province: {
                type: 'select',
                options: provinceOptions,
                required: true
              },
              City: {
                type: 'select',
                options: cityOptions,
                required: true,
                onCreateOption: (text) => {
                  return {
                    label: text,
                    value: text
                  };
                }
              },
              Size: {
                type: 'select',
                options: sizeData?.map((item) => ({
                  label: item?.size,
                  value: item?.size
                })),
                required: true
              },
              price: {
                type: 'number',
                required: true
              },
              Save: {
                type: 'submit'
              }
            }}
            onChange={({ changed, value }) => {
              if (changed?.[0] === 'Province') {
                setSelectedProvince(value?.Province?.value);
              }
            }}
            onSubmit={onSubmit}
          />
        </ModalBody>
      </LoadingOverlay>
    </Modal>
  );
};

export default CreatePriceModal;
