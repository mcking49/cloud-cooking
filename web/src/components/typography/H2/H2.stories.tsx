import { faker } from '@faker-js/faker'

import H2 from './H2'

export const generated = () => <H2>{faker.lorem.sentence(5)}</H2>

export default { title: 'Components/H2' }
