import { useMutation, useQueryClient } from '@tanstack/react-query';
import Axios from '../../utils/axiosInstance';
import { useSearchParams } from 'react-router-dom';
import { pushNotification } from '../../utils/pushNotification';
import { ResponseCheckListsType } from '../../models/CheckListsType';

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const putCathRemovalDate = async ({ checkListId, date }: { checkListId: number; date: Date }) => {
    const reponse = await Axios.put(`/api/checkListAfter/cath/${checkListId}?catheRemovalDate=${formatDate(date)}`);
    return reponse.data.data;
};
const putJpRemovalDate = async ({ checkListId, date }: { checkListId: number; date: Date }) => {
    const reponse = await Axios.put(`/api/checkListAfter/jp/${checkListId}?jpRemovalDate=${formatDate(date)}`);
    return reponse.data.data;
};
const putIvLineRemovalDate = async ({ checkListId, date }: { checkListId: number; date: Date }) => {
    console.log('xxx', formatDate(date));

    const reponse = await Axios.put(`/api/checkList/date/${checkListId}?date=${formatDate(date)}`);
    return reponse.data.data;
};

//-----------hookes----------------

export const usePutCathRemovalDateMutation = () => {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const operationId = searchParams.get('id');

    const mutation = useMutation({
        mutationFn: putCathRemovalDate,
        onSuccess: (_, parameter) => {
            queryClient.setQueryData(['checkLists', Number(operationId)], (prev: ResponseCheckListsType) => {
                return {
                    ...prev,
                    checkListAfterDTO: {
                        ...prev.checkListAfterDTO,
                        catheterRemovalDate: formatDate(parameter.date),
                    },
                };
            });
            pushNotification({
                msg: '소변줄 제거일이 등록되었습니다.',
                type: 'success',
                theme: 'light',
                position: 'top-center',
            });
        },
        onError: (error) => {
            console.log('putCathRemovalDate error', error);
        },
    });
    return mutation;
};

export const usePutJpRemovalDateMutation = () => {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const operationId = searchParams.get('id');

    const mutation = useMutation({
        mutationFn: putJpRemovalDate,
        onSuccess: (_, parameter) => {
            queryClient.setQueryData(['checkLists', Number(operationId)], (prev: ResponseCheckListsType) => {
                return {
                    ...prev,
                    checkListAfterDTO: {
                        ...prev.checkListAfterDTO,
                        jpDrainRemovalDate: formatDate(parameter.date),
                    },
                };
            });
            pushNotification({
                msg: 'JP 드레인 제거일이 등록되었습니다.',
                type: 'success',
                theme: 'light',
                position: 'top-center',
            });
        },
        onError: (error) => {
            console.log('putJpRemovalDate error', error);
        },
    });
    return mutation;
};

export const usePutIvLineRemovalDateMutation = () => {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const operationId = searchParams.get('id');

    const mutation = useMutation({
        mutationFn: putIvLineRemovalDate,
        onSuccess: (_, parameter) => {
            queryClient.setQueryData(['checkLists', Number(operationId)], (prev: ResponseCheckListsType) => {
                console.log('prev', prev);
                const updatedCheckListDTOs = prev.checkListDTOs ? [...prev.checkListDTOs] : [];
                updatedCheckListDTOs[2] = {
                    ...updatedCheckListDTOs[2],
                    podThreeIvLineRemovalDate: formatDate(parameter.date),
                };

                return {
                    ...prev,
                    checkListDTOs: updatedCheckListDTOs,
                };
            });
            pushNotification({
                msg: 'IV line 제거일이 등록되었습니다.',
                type: 'success',
                theme: 'light',
                position: 'top-center',
            });
        },
        onError: (error) => {
            console.log('putIvLineRemovalDate error', error);
        },
    });
    return mutation;
};
