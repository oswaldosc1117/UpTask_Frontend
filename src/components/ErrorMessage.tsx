
export default function ErrorMessage({children}: {children: React.ReactNode}) {
    return (
        <div className=" text-right pt-1 pb-3 px-3 text-red-500 font-bold text-sm">
            {children}
        </div>
    )
}
