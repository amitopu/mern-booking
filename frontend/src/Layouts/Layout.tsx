import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Hero from "../Components/Hero";

interface Props {
    children: React.ReactNode;
}
const Layout: React.FC<Props> = ({ children }: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header></Header>
            <Hero></Hero>
            <div className="container mx-auto flex-1 py-10">{children}</div>
            <Footer></Footer>
        </div>
    );
};

export default Layout;
