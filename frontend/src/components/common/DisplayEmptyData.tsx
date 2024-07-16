function DisplayEmptyData({ label, isRender }: { label: string; isRender: boolean }) {
    if (!isRender) {
        return null;
    }
    return <div className="flex justify-center w-full p-5 text-gray-400">{label}</div>;
}

export default DisplayEmptyData;
