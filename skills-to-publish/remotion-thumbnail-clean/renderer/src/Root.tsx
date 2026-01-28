import { Still, staticFile } from 'remotion';
import { Thumbnail, ThumbnailProps } from './Thumbnail';

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Still
                id="Thumbnail"
                component={Thumbnail}
                width={1280}
                height={720}
                defaultProps={{
                    headline: "THE BOTS ARE COMING",
                    emotionId: 7,
                    cutoutUrl: staticFile('cutout.png'),
                    bgUrl: staticFile('bg.png'),
                    stylePreset: "bold",
                } as ThumbnailProps}
            />
        </>
    );
};
