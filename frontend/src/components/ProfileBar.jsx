function ProfileBar({name}){
    return (
        <div className="flex gap-2">
            <div className="rounded-full w-8 h-8 bg-green-500 text-white text-2xl text-center">
                {name[0]}
            </div>
            <div className="font-semibold text-xl">
                {name}
            </div>
        </div>
    )
}

export default ProfileBar