import Image from "next/image";

interface AvatarProps {
    userPhoto: string;
    userName: string;
    onLogout: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ userPhoto, userName, onLogout }) => {
    const getInitials = (name: string) => {
        const names = name.split(" ");
        const initials = names.map((n) => n[0]).join("");
        return initials.toUpperCase();
    };

    const isUrl =
        userPhoto.startsWith("https://") || userPhoto.startsWith("http://");

    return (
        <div className="flex items-center p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-md">
            <div className="relative w-16 h-16 mr-4">
                {isUrl ? (
                    <Image
                        src={userPhoto}
                        alt="User Photo"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-600 text-white text-xl font-semibold rounded-full">
                        {getInitials(userName)}
                    </div>
                )}
            </div>
            <div className="flex flex-col">
                <p className="text-[#ece4da] text-lg font-semibold">
                    {userName}
                </p>
                <button
                    onClick={onLogout}
                    className="mt-2 px-4 py-2 text-[#ece4da] bg-blue-600 border border-blue-700 rounded hover:bg-blue-700"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Avatar;
