import ModalFullScreenContainer from '../../components/common/ModalFullScreenContainer';
// import DeleteIcon from '../../icons/DeleteIcon';
// import PencilIcon from '../../icons/PencilIcon';
// import SettingIcon from '../../icons/SettingIcon';

interface Props {
    onClose: () => void;
}

function MethodSettingSelectModal({ onClose }: Props) {
    return (
        <ModalFullScreenContainer
            maxWidthClassName="max-w-screen-tablet"
            maxHeightClassName="max-h-[270px]"
            title="관리"
            onClose={onClose}
        >
            <div className="flex flex-col items-center justify-center h-full gap-4 px-3 mx-auto max-w-screen-mobile">
                <div className="flex flex-col items-center w-full h-full gap-1 pt-1 mx-auto">
                    <button className="flex flex-row items-center justify-center w-full py-3 font-medium text-blue-500 hover:text-gray-900 focus:outline-none">
                        체크리스트 항목 설정
                    </button>
                    <div className="w-full border-t" />
                    <button className="flex flex-row items-center justify-center w-full py-3 font-medium text-green-600 hover:text-green-600 focus:outline-none">
                        수술명 변경
                    </button>
                    <div className="w-full border-t" />
                    <button className="flex flex-row items-center justify-center w-full py-3 font-medium text-gray-400 hover:text-red-400 focus:outline-none">
                        삭제
                    </button>
                </div>
            </div>
        </ModalFullScreenContainer>
    );
}

export default MethodSettingSelectModal;
