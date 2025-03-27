import { ListWrapper } from './index.styled'

const List = ({ title, categories }) => {
  return (
    <ListWrapper>
        <div className="header">
            <h4>
                { title }
            </h4>
            <div></div>
        </div>
        <ul>
            {categories}
        </ul>
    </ListWrapper>
  )
}

export default List