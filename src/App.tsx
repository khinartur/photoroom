import {Menu} from './Menu'
import {Content} from './Content'
import {observer} from 'mobx-react-lite'

export const App = observer(() => {
    return (
        <div className="flex h-full">
            <Menu />
            <Content />
        </div>
    )
})
