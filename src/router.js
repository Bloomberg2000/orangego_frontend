import AwardsDetail from "./pages/AwardsDetail";
import DiscussesDetail from "./pages/DiscussesDetail";
import Home from "./pages/Home/Home";
import LongCommentList from "./pages/LongCommentList";
import MoviesDetail from "./pages/MoviesDetail";
import ShortCommentList from "./pages/ShortCommentList";
import StaffsDetail from "./pages/StaffsDetail";
import UsersDetail from "./pages/UsersDetail";

export const routes = [
    {path: '/awardsDetail', component: AwardsDetail},
    {path: '/disscussesDetail', component: DiscussesDetail},
    {path: '/home', component: Home},
    {path: '/longCommentList', component: LongCommentList},
    {path: '/moviesDetail', component: MoviesDetail},
    {path: '/shortCommentList', component: ShortCommentList},
    {path: '/staffDetail', component: StaffsDetail},
    {path: '/usersDetail', component: UsersDetail},
]
