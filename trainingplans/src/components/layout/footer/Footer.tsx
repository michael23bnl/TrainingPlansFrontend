
export const Footer = () => {
    return (
        <div className="flex items-center flex-col
            w-full h-[40px]
            bg-[linear-gradient(to_bottom,#2a76b0_0%,#2a76b0_55%,#286ea9_55%,#286ea9_100%)]">
            <div className="flex flex-col text-center py-6">
                <ul className="p-10 pb-1 flex items-center justify-center gap-4">
                    <li>
                        <a href="#">
                            <img 
                                className="w-10 grayscale hover:grayscale-0" 
                                src="../src/assets/vk_icon.png" 
                                alt="VK">
                            </img>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img 
                                className="w-10 grayscale hover:grayscale-0" 
                                src="../src/assets/telegram_icon.png" 
                                alt="TG">        
                            </img>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img 
                                className="w-10 grayscale hover:grayscale-0 z-0" 
                                src="../src/assets/discord_icon.png" 
                                alt="DS">
                            </img>
                        </a>
                    </li>
                </ul>
                <span className="text-[22px]">Мы в социальных сетях</span>
            </div>
            <ul className="w-full flex justify-between px-[110px]">
                <li>Copyright © 2023-2025</li>
                <li>No rights reserved.</li>
            </ul>
        </div>
        
    );
}