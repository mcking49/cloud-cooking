import { faker } from '@faker-js/faker'

import H3 from './H3'

export const generated = () => <H3>{faker.lorem.sentence(5)}</H3>

export default { title: 'Components/H3' }
