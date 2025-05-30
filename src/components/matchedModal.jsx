import React from "react";

const MatchedModal = ({ type, person, company, skills, onClose, onUnmatch }) => {
    return (
        <div className="fixed w-full h-full flex justify-center items-center">
            <div className="flex flex-col items-center relative bg-purple-100 w-1/2 h-3/4 rounded-2xl p-2 shadow-2xl">
                <button className="absolute top-3 right-3" onClick={ onClose } aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" className="fill-gray-500 hover:fill-red-500 cursor-pointer transition-colors duration-200">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </button>
                <header className="mt-14 text-4xl font-bold">You matched!</header>
                <div className="flex flex-row mt-8">
                {type === "company" ? (
                    <div className="flex items-center">
                        <div className="z-0">
                        <img
                            src={"https://picsum.photos/200"}
                            alt={person.name}
                            className="w-45 h-45 rounded-full object-cover"
                        />
                        </div>
                        <div className="-ml-10 z-10">
                        <img
                            src={`https://picsum.photos/seed/${encodeURIComponent(company.companyName)}/200/300`}
                            alt={`${company.companyName} logo`}
                            className="w-45 h-45 rounded-full object-cover border-2 border-purple-100"
                        />
                        </div>
                    </div>
                    ) : (
                    <div className="flex items-center">
                        <div className="z-0">
                        <img
                            src={"https://picsum.photos/250"}
                            alt={'company logo'}
                            className="w-45 h-45 rounded-full object-cover"
                        />
                        </div>
                        <div className="-ml-10 z-10">
                        <img
                            src={"https://picsum.photos/200"}
                            alt={person.name}
                            className="w-45 h-45 rounded-full object-cover border-2 border-purple-100"
                        />
                        </div>
                    </div>
                )}
                </div>
                <div className="flex flex-col items-center mt-8">
                    {type === "company" ? (
                        <>
                            <h1 className="text-2xl font-semibold hover:text-purple-700 cursor-pointer">{company.role} at {company.companyName}</h1>
                            <div className="mt-2 font-bold">Matched Skills</div>
                            <div className="mt-2 flex flex-wrap justify-center max-h-14 overflow-hidden">
                                {skills.map(skill => (
                                    <button key={skill} className="pl-2 pr-2 mr-1 rounded-2xl bg-purple-400 border-purple-700 border-2 hover:bg-purple-300">
                                        {skill}
                                    </button>  
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl font-semibold hover:text-purple-700 cursor-pointer">{person.name}, {person.major}</h1>
                        </>
                    )}
                    <h3 className="mt-6 font-semibold">Ready to take the next step?</h3>
                    {type === "company" ? (
                        <>
                            <a
                                className="mt-1 px-6 py-2 text-xl rounded-2xl bg-purple-700 text-white active:bg-purple-700 hover:bg-purple-400 font-semibold"
                                href={company.link}
                                target="_blank">
                                Schedule Interview
                            </a>
                        </>
                    ) : (
                        <>
                            <a
                                className="mt-1 px-6 py-2 text-xl rounded-2xl bg-purple-700 text-white active:bg-purple-700 hover:bg-purple-400 font-semibold"
                                href={person.link}
                                target="_blank">
                                Schedule Interview
                            </a>
                        </>
                    )}
                    <button onClick={ onUnmatch } className="mt-2 font-semibold text-gray-500 cursor-pointer hover:text-gray-700">Unmatch</button>
                </div>

            </div>
        </div>
    )
}

export default MatchedModal;