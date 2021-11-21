import Vue from 'vue';
import { NavBar,Tabbar, TabbarItem,Toast,Search,Swipe, SwipeItem,Lazyload,
    Col,Row,Grid, GridItem,Divider
} from 'vant';

Vue.use(NavBar);  // 导航栏
Vue.use(Tabbar);  // 标签栏
Vue.use(TabbarItem);
Vue.use(Toast); // 轻提示
Vue.use(Search); // 搜索框
Vue.use(Swipe);  // 轮播
Vue.use(SwipeItem);
Vue.use(Lazyload ); // 懒加载
Vue.use(Col);  // 行
Vue.use(Row);   // 列
Vue.use(Grid); // 宫格
Vue.use(GridItem);
Vue.use(Divider); // 分割线