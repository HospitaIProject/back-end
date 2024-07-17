import ArrowIcon from '../../../icons/ArrowIcon';
import { Link, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

type Props = {
    type: 'PREV' | 'TODAY';
    id: number;
    name: string;
};

function CheckListsEmptyCard({ type, id, name }: Props) {
    const navigate = useNavigate();

    const dateComparison = type === 'PREV' ? '수술 전' : '수술 당일';

    const handleRouteCheckListForm = () => {
        // navigate(
        //     `/patient/form/compliance?id=${operationId}&name=${patientName}&dateStatus=${dateComparison}&diffDay=${diffDay}`,
        // );
    };

    return (
        <>
            <li
                className="flex w-full cursor-pointer flex-row items-center border-y bg-white p-4 hover:bg-blue-50"
                onClick={handleRouteCheckListForm}
            >
                <div className="flex w-full flex-row items-center gap-4">
                    <span className="w-[68px] text-lg font-semibold text-sky-800">{dateComparison}</span>
                    <div className="flex flex-row items-center justify-center">
                        <span className="inline-block break-words text-sm text-gray-700">작성 기록이 없습니다.</span>
                    </div>
                </div>
                <Link
                    to={`/patient/form/compliance?id=${id}&name=${name}&dateStatus=${type}&diffDay=${type === 'PREV' ? 1 : 0}`}
                    className={`mx-1 flex flex-shrink-0 flex-row items-center justify-center gap-2 rounded-lg border bg-gray-50 p-2 text-gray-400 shadow-sm`}
                >
                    <span className="text-sm">작성하기</span>
                    <ArrowIcon className="h-5 w-5 text-inherit" />
                </Link>
            </li>
        </>
    );
}

export default CheckListsEmptyCard;
