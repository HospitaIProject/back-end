import ArrowIcon from '../../../icons/ArrowIcon';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';

type Props = {
    day: number;
    id: number;
    name: string;
    order: number;
    today?: boolean;
    queryDate: string;
};

function CheckListsPostEmptyCard({ day, id, name, order, today = false, queryDate }: Props) {
    const dateComparison = `D+${day}`;

    const handleRouteCheckListForm = () => {
        // navigate(
        //     `/patient/form/compliance?id=${operationId}&name=${patientName}&dateStatus=${dateComparison}&diffDay=${diffDay}`,
        // );
    };

    return (
        <>
            <li
                className="flex flex-row items-center w-full gap-1 px-4 py-3 bg-white cursor-pointer border-y hover:bg-blue-50"
                style={{
                    order: order,
                }}
                onClick={handleRouteCheckListForm}
            >
                <div className="flex flex-row items-center w-full gap-3">
                    <span className="flex-shrink-0 w-12 font-semibold text-sky-800">{dateComparison}</span>
                    <div className="flex flex-row items-center">
                        <span className="inline-block text-sm text-gray-400 break-words">{`체크리스트 작성 가능합니다.`}</span>
                    </div>
                </div>
                <Link
                    to={`/patient/form/compliance?id=${id}&name=${name}&dateStatus=POST&diffDay=${-day}&date=${queryDate}`}
                    className={`relative mx-1 flex flex-shrink-0 flex-row items-center justify-center gap-1 rounded-lg border p-2 text-gray-400 shadow-sm`}
                >
                    <span className="text-sm">작성하기</span>
                    <ArrowIcon className="w-4 h-4 text-inherit" />
                    {today && (
                        <span className="absolute -right-3 -top-3 flex items-center justify-center rounded-md bg-yellow-200 p-[2px] text-xs text-red-500">
                            New
                        </span>
                    )}
                </Link>
            </li>
        </>
    );
}

export default CheckListsPostEmptyCard;
