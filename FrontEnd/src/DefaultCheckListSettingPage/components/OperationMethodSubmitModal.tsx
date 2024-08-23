import { useRef } from 'react';
import ModalFullScreenContainer from '../../components/common/ModalFullScreenContainer';
import FixedSubmitButton from '../../components/common/form/FixedSubmitButton';

interface Props {
    onClose: () => void;
}
function OperationMethodSubmitModal({ onClose }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const onSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
        if (event) event.preventDefault();

        if (inputRef.current?.value === '') {
            alert('수술명을 입력해주세요');
            return;
        }
        if (window.confirm('등록하시겠습니까?')) {
            // 등록 로직
        }
    };
    return (
        <ModalFullScreenContainer
            maxWidthClassName="max-w-screen-tablet"
            maxHeightClassName="max-h-[500px]"
            title="수술명 등록"
            onClose={onClose}
        >
            <div className={`mx-auto flex h-full flex-col`}>
                <form onSubmit={onSubmit} className="flex flex-col h-full p-3">
                    <div className="border-b-2 border-gray-300 focus-within:border-blue-500">
                        <input
                            ref={inputRef}
                            type="text"
                            className="w-full p-1 outline-none"
                            placeholder="수술명을 입력해주세요"
                        />
                    </div>
                    <span className="text-xs text-yellow-400"></span>
                    <FixedSubmitButton className="" label="등록하기" type="submit" />
                </form>
            </div>
        </ModalFullScreenContainer>
    );
}

export default OperationMethodSubmitModal;
