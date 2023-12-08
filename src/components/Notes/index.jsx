import {Container} from './style'
import {Tag} from '../Tag'
export function Notes({data, ...rest})
{
    return (
        <Container {...rest}>
            <h1>{data.title}</h1>

            <footer>
                {data.tags && data.tags.map(tag => <Tag key={tag.id} title={tag.name} /> )}
            </footer>
        </Container>
    )
}