// import DesktopPagination from './DesktopPagination';
import MobilePagination from './MobilePagination';

function ResponsivePagination({ pageSize = 1 }: { pageSize?: number }) {
    return (
        <>
            <div className="flex flex-row w-full mt-auto border-t border-gray-200 mobile:hidden">
                <MobilePagination pageSize={pageSize} />
            </div>
            <div className="flex-row hidden w-full mt-auto border-t border-gray-200 mobile:flex">
                {/* <DesktopPagination pageSize={pageSize} /> */}
                <MobilePagination pageSize={pageSize} />
            </div>
        </>
    );
}

export default ResponsivePagination;
