import Wrapper from '@/components/atoms/wrapper'
import { SidebarCommunity } from './community/sidebar-community'

const ReCommunitySection: React.FC = () => {
  return (
    <Wrapper className='py-20 lg:py-32 relative'>
      <SidebarCommunity />
    </Wrapper>
  )
}

export { ReCommunitySection }
