export const UserRoute = {
    login:'/login',
    dashborad:'/dashboard',
    events:'/dashboard/events',
    artists:'/dashboard/artists',
    performanceTime:'/dashboard/performanceTime',
    contacts:'/dashboard/contracts'
}

export const getUserData = ()=>{
    try {
        const data = JSON.parse(window.localStorage.getItem('userInfo'));
        return data;
    } catch (error) {
        return null;
    }
}