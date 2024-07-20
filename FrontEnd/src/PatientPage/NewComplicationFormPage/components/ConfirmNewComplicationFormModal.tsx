import ModalFullScreenContainer from '../../../components/common/ModalFullScreenContainer';
import FixedSubmitButton from '../../../components/common/form/FixedSubmitButton';
import ViewInput from '../../../components/common/form/viewInput/ViewInput';
import { ComplicationFormType } from '../../../models/ComplicationType';
import { COMPLICATION_ITEMS_NAME } from '../../../utils/mappingNames';

type Props = {
    formValues?: ComplicationFormType;
    onSubmit: () => void;
    onClose: () => void;
    submitLabel?: string;
};

function ConfirmNewComplicationFormModal({ formValues, submitLabel, onSubmit, onClose }: Props) {
    let values = {
        ...formValues,
    };

    return (
        <ModalFullScreenContainer title="확인" onClose={onClose}>
            <div className="flex flex-col w-full gap-4 px-4 pt-4">
                {Object.keys(COMPLICATION_ITEMS_NAME).map((key) => (
                    <>
                        {key === 'anastomosisBleeding' && (
                            <span className="mx-auto font-semibold text-gray-600">[문합부 관련]</span>
                        )}
                        {key === 'ileus' && <span className="mx-auto font-semibold text-gray-600">[소화기계]</span>}
                        {key === 'arrhythemia' && (
                            <span className="mx-auto font-semibold text-gray-600">[심혈관계]</span>
                        )}
                        {key === 'atelectasis' && (
                            <span className="mx-auto font-semibold text-gray-600">[호흡기계]</span>
                        )}
                        {key === 'urinaryDysfunctionRetension' && (
                            <span className="mx-auto font-semibold text-gray-600">[비뇨생식기계]</span>
                        )}
                        {key === 'superficialDeepSsi' && (
                            <span className="mx-auto font-semibold text-gray-600">[피부창상관련]</span>
                        )}
                        <ViewInput
                            key={key} // 고유한 key 속성 제공
                            label={COMPLICATION_ITEMS_NAME[key]}
                            value={values[key] as string}
                        />
                    </>
                ))}
                <div className="my-3" />

                {values.customComplications?.map((customComplication, index) => (
                    <ViewInput
                        key={index}
                        label={
                            index === 0
                                ? `[신경계] ${customComplication.complicationName}`
                                : `[기타] ${customComplication.complicationName}`
                        }
                        value={customComplication.cdClassification}
                    />
                ))}
                {values.remarks && <ViewInput label="비고" value={values.remarks} />}
                {Boolean(onSubmit) && (
                    <FixedSubmitButton onClick={onSubmit} label={submitLabel ? submitLabel : '등록'} />
                )}
            </div>
        </ModalFullScreenContainer>
    );
}

export default ConfirmNewComplicationFormModal;
