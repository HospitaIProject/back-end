import { useEffect, useRef } from 'react';
import ModalFullScreenContainer from '../../components/common/ModalFullScreenContainer';
import FixedSubmitButton from '../../components/common/form/FixedSubmitButton';
import { useOperationMethodMutation } from '../_lib/defaultCheckListSettingService';

interface Props {
    onClose: () => void;
    type: 'post' | 'put';
    initValue?: string;
}
function OperationMethodSubmitModal({ onClose, type, initValue }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const operationMethodMutation = useOperationMethodMutation();

    const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
        if (event) event.preventDefault();
        if (!inputRef.current) return;
        const trimmedValue = inputRef.current.value.trim(); // 입력값 앞뒤 공백 제거
        if (trimmedValue === '') {
            alert('수술명을 입력해주세요');
            return;
        }

        if (
            window.confirm(
                type === 'post' ? '등록하시겠습니까?' : `${initValue}${inputRef.current?.value}변경하시겠습니까?`,
            )
        ) {
            if (type === 'post') {
                operationMethodMutation.mutate({
                    operationMethod: inputRef.current?.value,
                    type: type,
                });
            } else {
                operationMethodMutation.mutate({
                    operationMethod: initValue as string,
                    newOperationMethod: inputRef.current?.value,
                    type: type,
                });
            }
        }
    };
    useEffect(() => {
        if (operationMethodMutation.isSuccess) {
            onClose();
            operationMethodMutation.reset();
        }
    }, [operationMethodMutation.isSuccess]);
    return (
        <ModalFullScreenContainer
            maxWidthClassName="max-w-screen-tablet"
            maxHeightClassName="max-h-[500px]"
            title={`${type === 'post' ? '수술명 추가' : '수술명 변경'}`}
            onClose={onClose}
        >
            <div className={`mx-auto flex h-full flex-col`}>
                <form onSubmit={onSubmit} className="flex flex-col items-center h-full p-3">
                    <div className="w-full border-b-2 border-gray-300 focus-within:border-blue-500">
                        <input
                            ref={inputRef}
                            defaultValue={initValue}
                            type="text"
                            className="w-full p-1 outline-none"
                            placeholder="수술명을 입력해주세요"
                        />
                    </div>
                    <span className="text-xs text-yellow-400"></span>
                    <FixedSubmitButton
                        className=""
                        label={`${type === 'post' ? '등록하기' : '변경하기'}`}
                        type="submit"
                    />
                </form>
            </div>
        </ModalFullScreenContainer>
    );
}

export default OperationMethodSubmitModal;
