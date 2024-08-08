import ArrowIcon from '../../icons/ArrowIcon';
import ReactPaginate from 'react-paginate';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

function MobilePagination({ pageSize }: { pageSize: number }) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();

    const handleRouter = ({ selected }: { selected: number }) => {
        const page = selected + 1;
        const params = new URLSearchParams(searchParams.toString());
        if (page === 1) {
            params.delete('page');
        } else {
            params.set('page', page.toString());
        }
        navigate(pathname + '?' + params.toString(), { replace: true });
    };

    const forcePage = Number(searchParams.get('page')) ? Number(searchParams.get('page')) - 1 : 0;

    const goToPreviousPage = () => {
        if (forcePage === 0) return;
        handleRouter({ selected: forcePage - 1 });
    };
    const goToNextPage = () => {
        if (forcePage === pageSize) return;
        handleRouter({ selected: forcePage + 1 });
    };

    return (
        <div className="flex items-center justify-between w-full py-2 bg-white border-y">
            {/* <span className="text-sm font-semibold">
                    <span className="text-blue-600">{forcePage + 1} /</span> {pageSize}
                </span> */}
            <button
                onClick={goToPreviousPage}
                disabled={forcePage === 0}
                className={`mr-1 flex h-8 items-center justify-center px-2 py-1 text-gray-700 ${forcePage === 0 ? 'cursor-not-allowed opacity-40' : ''}`}
            >
                <ArrowIcon className="w-8 h-auto transform rotate-180" />
            </button>

            <ReactPaginate
                previousLabel={null}
                nextLabel={null}
                breakLabel={
                    <div className="flex items-center justify-center rounded-lg h-9 w-9">
                        <span>...</span>
                    </div>
                }
                pageCount={pageSize}
                onPageChange={handleRouter}
                containerClassName={'flex flex-row   text-lg mx-auto    items-center '}
                pageLinkClassName={
                    'flex items-center justify-center w-9 h-9 text-sm b rounded-lg hover:border-blue-500'
                }
                activeLinkClassName="bg-blue-400  text-white border-none"
                pageRangeDisplayed={2} //선택된 페이지 주변에 보여질 페이지 수
                marginPagesDisplayed={1} //첫 페이지와 마지막 페이지 주변에 보여질 페이지 수
                forcePage={forcePage} //선택된 페이지
            />
            <button
                onClick={goToNextPage}
                disabled={forcePage === pageSize - 1}
                className={`ml-1 flex h-8 items-center justify-center rounded-md px-2 py-1 text-gray-700 ${forcePage === pageSize - 1 ? 'cursor-not-allowed opacity-40' : ''}`}
            >
                <ArrowIcon className="w-8 h-auto text-inherit" />
            </button>
        </div>
    );
}

export default MobilePagination;
