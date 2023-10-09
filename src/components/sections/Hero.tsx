import Slider from "../elements/Slider";

const Hero = () => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">Best Mediacl <br/>Technologies.</h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                    Explorez notre vaste bibliothèque de contenu comprenant des articles informatifs, 
                    des analyses détaillées, des interviews exclusives avec 
                    des experts et des ressources téléchargeables. Que vous soyez un professionnel 
                    de la santé, un chercheur, un étudiant ou simplement un passionné de technologie 
                    médicale, Best Medical Technologies est votre source incontournable pour rester à
                    jour sur les tendances les plus récentes.
                    </p>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <Slider names={['1.png', '2.png', '3.jpg', '4.png', '5.png', '6.png', '7.png']}/>
                </div>                
            </div>
        </section>
    )
}

export default Hero;