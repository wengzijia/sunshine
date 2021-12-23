import Vue from 'vue';
import {
    NavBar, Tabbar, TabbarItem, Toast, Search,
    Swipe, SwipeItem, Lazyload, Col, Row, Grid,
    GridItem, Divider, List, Cell, CellGroup,
    PullRefresh, Sticky, Form, Field, Button,
    GoodsAction, GoodsActionIcon, GoodsActionButton,
    Sku, Dialog, Popup, Empty, DropdownMenu, DropdownItem,
    Checkbox, CheckboxGroup, Stepper, SubmitBar,AddressList,
    AddressEdit,Icon,Tab,Tabs,Tag,Card,Step,Steps,Uploader,
    Image as VanImage
} from 'vant';

Vue.use(NavBar);  // 导航栏
Vue.use(Tabbar);  // 标签栏
Vue.use(TabbarItem);
Vue.use(Toast); // 轻提示
Vue.use(Search); // 搜索框
Vue.use(Swipe);  // 轮播
Vue.use(SwipeItem);
Vue.use(Lazyload); // 懒加载
Vue.use(Col);  // 行
Vue.use(Row);   // 列
Vue.use(Grid); // 宫格
Vue.use(GridItem);
Vue.use(Divider); // 分割线
Vue.use(List); // 列表
Vue.use(Cell);  // 单元格
Vue.use(CellGroup);
Vue.use(PullRefresh); // 下拉刷新
Vue.use(Sticky);  //  粘性布局
Vue.use(Form); // 表单
Vue.use(Field);  //  输入框
Vue.use(Button); // 按钮
Vue.use(GoodsAction); // 商品导航
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Sku); // sku商品规格
Vue.use(Dialog); // 弹出框
Vue.use(Popup); // 弹出层
Vue.use(Empty); // 空状态
Vue.use(DropdownMenu); // 下拉菜单
Vue.use(DropdownItem);
Vue.use(Checkbox); // 复选框
Vue.use(CheckboxGroup);
Vue.use(Stepper);// 步进器
Vue.use(SubmitBar); // 提交订单栏
Vue.use(AddressList); // 地址列表
Vue.use(AddressEdit); // 地址编辑
Vue.use(Icon);  // 图标
Vue.use(Tab);  // 标签页
Vue.use(Tabs);
Vue.use(Tag); // 标签
Vue.use(Card); // 卡片
Vue.use(Step); // 步骤条
Vue.use(Steps);
Vue.use(Uploader); // 文件上传
Vue.use(VanImage); // 图片