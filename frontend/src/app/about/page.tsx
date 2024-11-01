import Image from "next/image"

export default function About() {
    return (
        <div className="container mx-auto px-[20%]">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Image alt="Margo" src="/Margo.jpg" width={300} height={300} />
                </div>
                <div className="flex items-center">
                    Margosha loves to play small mini-games together. But we always struggle to find them online, and sometimes we cannot find an online version of a game we were looking for.
                </div>
                <div className="flex items-center">
                    Ali being the programming genius that he is wanted to make a small website where we could try to make the mini-games to play together
                </div>
                <div>
                    <Image alt="Ali" src="/Ali.jpg" width={300} height={300}></Image>
                </div>
                <div>
                    <Image alt="AliMargo" src="/AliMargo.jpg" width={300} height={300}></Image>
                </div>
                <div className="flex items-center">
                    AliRitaGames was born for us to have fun playing silly games together forever :)
                </div>
            </div>
        </div>
    )
}