export default function AddMenuBtn({ handleClick }: { handleClick: () => void }) {
    return (
        <button onClick={handleClick}>
            <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white group-hover:text-[#253BFF] hover:text-[#253BFF]"
            >
                <rect width="26" height="26" rx="13" fill="currentColor" />
                <path
                    d="M13 8.91667V17.0833M8.91666 13H17.0833"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
}
