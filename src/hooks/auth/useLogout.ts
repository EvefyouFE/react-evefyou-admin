import { useNavigate } from "react-router";

export function useLogout() {
    const navigate = useNavigate()

    const onLogout = () => {
        // 清理token 缓存

        navigate('/login')
    }

    return {
        onLogout
    }
}