import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import FixedSubmitButton from '../../../components/common/form/FixedSubmitButton';
import {
    usePutCathRemovalDateMutation,
    usePutIvLineRemovalDateMutation,
    usePutJpRemovalDateMutation,
} from '../../_lib/removalDateService';
import DatePickerButton from './DatePickerButton';

interface Props {
    onClose: () => void;
    od: string;
    catheterRemoval?: string; //
    catheterRemovalDate?: string;
    jpDrainRemoval?: string;
    jpDrainRemovalDate?: string;
    podThreeIvLineRemovalDate?: string;
    checkListAfterId?: number;
    checkListId?: number;
}
function RemoveDateModal({
    onClose,
    od,
    catheterRemovalDate,
    jpDrainRemovalDate,
    podThreeIvLineRemovalDate,
    catheterRemoval,
    jpDrainRemoval,
    checkListAfterId,
    checkListId,
}: Props) {
    const putCathRemovalDateMutation = usePutCathRemovalDateMutation();
    const putJpRemovalDateMutation = usePutJpRemovalDateMutation();
    const putIvLineRemovalDateMutation = usePutIvLineRemovalDateMutation();

    const handleCatheterRemovalDate = (date: Date) => {
        if (!checkListAfterId) return;
        putCathRemovalDateMutation.mutate({ checkListId: checkListAfterId, date });
    };
    const handleJpDrainRemovalDate = (date: Date) => {
        if (!checkListAfterId) return;
        putJpRemovalDateMutation.mutate({ checkListId: checkListAfterId, date });
    };
    const handlePodThreeIvLineRemovalDate = (date: Date) => {
        if (!checkListId) return;
        putIvLineRemovalDateMutation.mutate({ checkListId, date });
    };
    const operationDate = new Date(od);
    const isYesCatheterRemoval = catheterRemoval === 'YES';
    const isYesJpDrainRemoval = jpDrainRemoval === 'YES';

    return (
        <>
            <ModalFullScreenContainer
                maxWidthClassName="max-w-screen-tablet"
                maxHeightClassName="max-h-[500px]"
                title="제거일 등록"
                onClose={onClose}
            >
                <div className={`mx-auto flex h-full flex-col text-sm`}>
                    <div className="flex flex-col h-full px-4 py-3 text-gray-600 gap-7">
                        <div className="flex flex-col w-full gap-1 py-1 border-b">
                            <div className="flex w-full">
                                <span className="w-36">소변줄 제거일:</span>
                                {!checkListAfterId && <span className="mr-auto">{'수술 후 작성 이후 등록가능'}</span>}
                                {checkListAfterId && (
                                    <span
                                        className={`mr-auto ${catheterRemovalDate ? 'font-medium text-blue-500' : ''}`}
                                    >
                                        {catheterRemovalDate || '제거일 등록 필요'}
                                    </span>
                                )}
                                {!isYesCatheterRemoval && (
                                    <DatePickerButton
                                        onSelectedDate={handleCatheterRemovalDate}
                                        minDate={operationDate}
                                        initialDate={catheterRemovalDate}
                                        isDisabled={Boolean(!checkListAfterId)}
                                    />
                                )}
                            </div>
                            <span className="text-red-700">{isYesCatheterRemoval ? '- 수술장에서 제거됨' : ''}</span>
                        </div>

                        <div className="flex flex-col w-full gap-1 py-1 border-b">
                            <div className="flex w-full">
                                <span className="w-36">JP drain 제거일:</span>
                                {!checkListAfterId && <span className="mr-auto">{'수술 후 작성 이후 등록가능'}</span>}
                                {checkListAfterId && (
                                    <span
                                        className={`mr-auto ${jpDrainRemovalDate ? 'font-medium text-blue-500' : ''}`}
                                    >
                                        {jpDrainRemovalDate || '제거일 등록 필요'}
                                    </span>
                                )}
                                {!isYesJpDrainRemoval && (
                                    <DatePickerButton
                                        onSelectedDate={handleJpDrainRemovalDate}
                                        minDate={operationDate}
                                        initialDate={jpDrainRemovalDate}
                                        isDisabled={Boolean(!checkListAfterId)}
                                    />
                                )}
                            </div>
                            <span className="text-red-700">
                                {isYesJpDrainRemoval ? '- 수술 후 1일이내 제거됨' : ''}
                            </span>
                        </div>

                        <div className="flex flex-col items-center w-full gap-1 py-1 border-b">
                            <div className="flex w-full">
                                <span className="w-36">IV line 제거일:</span>
                                {!checkListId && <span className="mr-auto">{'D+3 작성 이후 등록가능'}</span>}
                                {checkListId && (
                                    <span
                                        className={`mr-auto ${podThreeIvLineRemovalDate ? 'font-medium text-blue-500' : ''}`}
                                    >
                                        {podThreeIvLineRemovalDate || '제거일 등록 필요'}
                                    </span>
                                )}
                                <DatePickerButton
                                    onSelectedDate={handlePodThreeIvLineRemovalDate}
                                    minDate={operationDate}
                                    initialDate={podThreeIvLineRemovalDate}
                                    isDisabled={Boolean(!checkListId)}
                                />
                            </div>
                        </div>
                        <FixedSubmitButton onClick={onClose} className="" label="닫기" type="submit" />
                    </div>
                </div>
            </ModalFullScreenContainer>
        </>
    );
}

export default RemoveDateModal;
