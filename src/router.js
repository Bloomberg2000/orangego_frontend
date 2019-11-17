import AwardsDetail from "./pages/AwardsDetail";
import DiscussesDetail from "./pages/DiscussesDetail";
import LongCommentList from "./pages/LongCommentList";
import MoviesDetail from "./pages/MoviesDetail";
import ShortCommentList from "./pages/ShortCommentList";
import StaffsDetail from "./pages/StaffsDetail";
import UsersDetail from "./pages/UsersDetail";
import Home from "./pages/Home/Home";
import TheatricalLine from "./pages/TheatricalLine/TheatricalLine";
import Login from "./pages/Login/Login";

export const routes = [
    {path: '/login', component: Login},
    {path: '/home', component: Home},
    {path: '/theatricalLine', component: TheatricalLine},
    {path: '/awardsDetail', component: AwardsDetail},
    {path: '/discussesDetail', component: DiscussesDetail},
    {path: '/longCommentList', component: LongCommentList},
    {path: '/moviesDetail', component: MoviesDetail},
    {path: '/shortCommentList', component: ShortCommentList},
    {path: '/staffDetail', component: StaffsDetail},
    {path: '/usersDetail', component: UsersDetail},
];
