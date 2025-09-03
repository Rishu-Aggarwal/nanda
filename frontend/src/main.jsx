import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes.jsx'
import { Provider } from "react-redux";
import Store from './store/Store.jsx';
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './index.css';
createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <RouterProvider router={router}>
    </RouterProvider>
  </Provider>
)
