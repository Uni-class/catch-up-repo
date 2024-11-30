import { css } from '@/styled-system/css';
import PlaceholderLayout from '@/components/Placeholder/PlaceholderLayout';
import Placeholder from '@/components/Placeholder/Placeholder';

export default function Loading() {
  return (
    <div
      className={css({
        display: 'flex',
        width: '100%',
        height: '100%',
      })}
    >
      <PlaceholderLayout type={'horizontal'} gap={0} alignItems={'center'}>
        <PlaceholderLayout type={'vertical'} gap={0} alignItems={'center'}>
          <PlaceholderLayout
            type={'vertical'}
            padding={'2em'}
            gap={'1em'}
            alignItems={'flex-start'}
          >
            <Placeholder
              type={'text'}
              width={'15em'}
              height={'1.5em'}
              lineHeight={'1.5em'}
            />
            <Placeholder
              type={'text'}
              width={'10em'}
              height={'4.5em'}
              lineCount={3}
              lineGap={'0.5em'}
            />
            <Placeholder width={'100%'} height={'100%'} />
          </PlaceholderLayout>
        </PlaceholderLayout>
      </PlaceholderLayout>
    </div>
  );
}
