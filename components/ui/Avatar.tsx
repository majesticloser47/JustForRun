import Image from "next/image";

interface AvatarProps {
    userPhoto: string;
    userName: string;
    onLogout: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ userPhoto, userName, onLogout }) => {
    return (
        <div className="flex items-center p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-md">
            <div className="relative w-16 h-16 mr-4">
                <Image
                    src={userPhoto}
                    alt="User Photo"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                />
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
