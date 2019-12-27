import AwardsDetail from "./pages/AwardsDetail/AwardsDetail";
import DiscussesDetail from "./pages/DiscussesDetail";
import MoviesDetail from "./pages/MoviesDetail/MoviesDetail";
import StaffsDetail from "./pages/StaffsDetail/StaffsDetail";
import UsersDetail from "./pages/UsersDetail";
import Home from "./pages/Home/Home";
import TheatricalLine from "./pages/TheatricalLine/TheatricalLine";
import MoviesGallery from "./pages/MoviesGallery/MoviesGallery";
import HottestComments from "./pages/HottestComments/HottestComments";

export const routes = [
    {path: '/home', component: Home},
    {path: '/theatricalLine', component: TheatricalLine},
    {path: '/moviesGallery', component: MoviesGallery},
    {path: '/hottestComments', component: HottestComments},
    {path: '/movie/:id', component: MoviesDetail},
    {path: '/staff/:id', component: StaffsDetail},
    {path: '/award/:id', component: AwardsDetail},
    {path: '/discussesDetail', component: DiscussesDetail},
    {path: '/usersDetail', component: UsersDetail},
];
