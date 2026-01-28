import { AbsoluteFill, Img, useVideoConfig } from 'remotion';
import React from 'react';

export interface ThumbnailProps {
    headline: string;
    emotionId: number;
    cutoutUrl: string;
    bgUrl: string;
    stylePreset: 'bold' | 'dramatic' | 'clean';
    accentColor?: string;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({
    headline,
    cutoutUrl,
    bgUrl,
    stylePreset,
    accentColor = '#ff0000',
}) => {
    const { width, height } = useVideoConfig();

    return (
        <AbsoluteFill style={{ backgroundColor: 'black', fontFamily: 'Inter, sans-serif' }}>
            {/* Background Layer with Overlay Gradient */}
            <AbsoluteFill>
                <Img
                    src={bgUrl}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: stylePreset === 'dramatic' ? 'brightness(0.6) contrast(1.1) saturate(1.2)' : 'brightness(0.8)',
                    }}
                />
                <AbsoluteFill style={{
                    background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.8) 100%)',
                    mixBlendMode: 'multiply'
                }} />
            </AbsoluteFill>

            {/* Expression Cutout with Edge Lighting Effect */}
            <AbsoluteFill
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    padding: '0px',
                }}
            >
                <div style={{
                    position: 'relative',
                    height: '110%',
                    transform: 'translateX(5%) translateY(5%)'
                }}>
                    <Img
                        src={cutoutUrl}
                        style={{
                            height: '100%',
                            objectFit: 'contain',
                            filter: `drop-shadow(0 0 30px rgba(0,0,0,0.8)) drop-shadow(0 0 10px ${accentColor}44)`,
                        }}
                    />
                </div>
            </AbsoluteFill>

            {/* Headline Text Layer */}
            <AbsoluteFill
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    padding: '60px 80px',
                    pointerEvents: 'none',
                }}
            >
                <h1
                    style={{
                        fontSize: '135px',
                        color: 'white',
                        textAlign: 'left',
                        textTransform: 'uppercase',
                        fontWeight: 900,
                        margin: 0,
                        lineHeight: 0.85,
                        maxWidth: '75%',
                        fontFamily: 'Impact, "Arial Black", sans-serif',
                        // Multi-layer shadow for "thicker" stroke and punch
                        textShadow: `
                            -6px -6px 0px #000,  
                             6px -6px 0px #000,
                            -6px  6px 0px #000,
                             6px  6px 0px #000,
                             12px 12px 0px ${accentColor},
                             20px 20px 40px rgba(0,0,0,0.8)
                        `,
                        transform: 'rotate(-2deg) skewX(-2deg)',
                    }}
                >
                    {headline}
                </h1>
            </AbsoluteFill>

            {/* Subtle Vignette */}
            <AbsoluteFill style={{
                boxShadow: 'inset 0 0 200px rgba(0,0,0,0.6)'
            }} />
        </AbsoluteFill>
    );
};
