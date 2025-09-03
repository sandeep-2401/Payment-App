function TopBarDash({name,balance}){
    return(
        <div className="p-4">
            <div className="flex justify-between">
                <div className="font-bold text-2xl">
                    Payments App
                </div>
                <div className="flex justify-center items-center text-center gap-1 text-md">
                    <div>
                        Hello, {name}
                    </div>
                    <div className="rounded-full bg-gray-200 w-8 h-8 flex items-center justify-center text-center">
                        {name[0]}
                    </div>
                </div>

            </div>

            <div className="flex gap-2 mt-7 items-center text-center">
                <div className="text-xl font-semibold">
                    Your Balance 
                </div>
                <div className="text-lg">
                    ${balance}
                </div>
                
            </div>
        </div>
    )
}

export default TopBarDash