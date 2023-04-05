import DashBoard from './views/DashBoard.js';
import Posts from './views/Posts.js';
import Settings from './views/Settings.js';
import NotFound from './views/NotFound.js';
// client Router 구현

// * pushState(state, unused, url)
// 브라우저 세션에(history stack)에 항목을 추가 해주는 매서드,
// 단 이 매서드는 비동기여서 popstate을 위해 listner를 추가해줘야 함
// 즉, Redirection시 정보가 사라지지 않고 이전 기록을 남길 수 있다.
const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        {
            path: '/',
            view: DashBoard,
        },
        {
            path: '/posts',
            view: Posts,
        },
        {
            path: '/settings',
            view: Settings,
        },
        {
            path: '/404',
            view: NotFound,
        },
    ];

    // 경로 테스트
    const isMatchLocation = routes.map((route) => {
        return {
            route,
            isMatch: window.location.pathname === route.path, // type : boolean
        };
    });

    // 경로 테스트 결과 매칭 되는 부분 찾기 (isMatch true 값만)
    let match = isMatchLocation.find((location) => location.isMatch);

    // 경로가 맞지 않는 다면, NotFound Page
    if (!match) {
        match = {
            route: routes[3],
            isMatch: true,
        };
    }

    // class instance
    const view = new match.route.view();
    // getHtml()을 통해 동적 파싱
    document.querySelector('#app').innerHTML = await view.getHtml();

    console.log(view);
};
window.addEventListener('popstate', router);

// DOM트리를 파싱 시, Router 비동기 호출
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            navigateTo(e.target.href); // href를 인지할 수 있는 이유는 locatoin 값을 전달 받기 때문
        }
    });
    router(); // 해당 페이지 컴포넌트만 true 값
});
