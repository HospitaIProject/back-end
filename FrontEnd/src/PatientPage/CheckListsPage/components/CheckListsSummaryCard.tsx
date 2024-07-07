import { useDateFormatted } from '../../../Hooks/useDateFormatted';
import { CheckListsItemType } from '../../../models/CheckListsType';
// import { Link } from 'react-router-dom';

type Props = {
    surgeryData: CheckListsItemType;
};

function CheckListsSummaryCard({ surgeryData }: Props) {
    const { checkListId, createAt, updatedAt } = surgeryData;

    const { onlyDate: formattedCreateAt } = useDateFormatted(createAt); //작성일
    const { onlyDate: formattedUpdatedAte } = useDateFormatted(updatedAt); //수정일

    return (
        <>
            <li
                key={checkListId}
                className="flex flex-col w-full gap-3 p-4 bg-white border-y"
                // onClick={handleOpenModal}
            >
                <div className="flex flex-row flex-wrap items-center justify-between gap-4 mb-1">
                    <span className="text-lg font-semibold text-sky-800">작성일:&nbsp;{formattedCreateAt}</span>
                    <button className="text-sm font-semibold text-blue-600 underline underline-offset-4">
                        상세정보
                    </button>
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-col gap-1">
                        <span className="inline-block text-sm text-gray-700 break-words">
                            수술일:&nbsp;
                            <span className="font-medium text-gray-900">
                                {formattedCreateAt ? formattedCreateAt : '없음'}
                            </span>
                        </span>
                        <span className="inline-block text-sm text-gray-700 break-words">
                            입원일:&nbsp;
                            <span className="font-medium text-gray-900">{formattedUpdatedAte}</span>
                        </span>
                    </div>
                </div>

                <div className="w-full my-1 border-t" />

                <div className="flex flex-row justify-end w-full gap-2 text-gray-600">
                    {/* <Link
                        to={`/patient/checkLists?id=${operationId}`}
                        className="p-2 text-sm font-medium border rounded-md hover:bg-blue-50"
                    >
                        체크리스트
                    </Link> */}
                </div>
            </li>
        </>
    );
}

export default CheckListsSummaryCard;
