import React, { forwardRef } from 'react';
import { DefaultProps, MantineColor, ClassNames } from '@mantine/styles';
import { Box } from '../Box';
import { Curve } from './Curve/Curve';
import { getCurves } from './get-curves/get-curves';
import useStyles from './RingProgress.styles';

export type RingProgressStylesNames = ClassNames<typeof useStyles>;

export interface RingProgressProps
  extends DefaultProps<RingProgressStylesNames>,
    React.ComponentPropsWithoutRef<'div'> {
  /** Label displayed in the center of the ring */
  label?: React.ReactNode;

  /** Ring thickness */
  thickness?: number;

  /** Width and height of the progress ring in px */
  size?: number;

  /** Ring sections */
  sections: { value: number; color: MantineColor }[];
}

export const RingProgress = forwardRef<HTMLDivElement, RingProgressProps>(
  (
    {
      className,
      style,
      label,
      sections,
      size = 120,
      thickness = size / 10,
      classNames,
      styles,
      ...others
    }: RingProgressProps,
    ref
  ) => {
    const { classes, cx } = useStyles(null, { classNames, styles, name: 'RingProgress' });

    const curves = getCurves({ size, thickness, sections }).map((curve, index) => (
      <Curve
        key={index}
        value={curve.data?.value}
        size={size}
        thickness={thickness}
        sum={curve.sum}
        offset={curve.offset}
        color={curve.data?.color}
        root={curve.root}
      />
    ));

    return (
      <Box
        style={{ width: size, height: size, ...style }}
        className={cx(classes.root, className)}
        ref={ref}
        {...others}
      >
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {curves}
        </svg>

        {label && (
          <div className={classes.label} style={{ right: thickness * 2, left: thickness * 2 }}>
            {label}
          </div>
        )}
      </Box>
    );
  }
);

RingProgress.displayName = '@mantine/core/RingProgress';
