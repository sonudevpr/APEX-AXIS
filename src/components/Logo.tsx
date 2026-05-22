type LogoProps = {
  size?: number | string;
  className?: string;
  animate?: boolean;
  speed?: number;
};

type Point = [number, number];

type Segment = {
  from: Point;
  to: Point;
  delay: number;
};

type Node = {
  point: Point;
  radius: number;
  delay: number;
  center?: boolean;
};

export default function Logo({
  size = 64,
  className,
  animate = false,
  speed = 0.62,
}: LogoProps) {
  const color = "#7B2FBE";

  // Geometry matched to the supplied official brand mark.
  const top: Point = [100, 10];
  const upperRight: Point = [176, 55];
  const lowerRight: Point = [176, 145];
  const bottom: Point = [100, 190];
  const lowerLeft: Point = [24, 145];
  const upperLeft: Point = [24, 55];
  const center: Point = [100, 100];
  const midLeft: Point = [62, 122];
  const midRight: Point = [138, 122];

  const duration = 0.34 * speed;
  const gap = 0.105 * speed;
  let time = 0;

  const segments: Segment[] = [];
  const add = (from: Point, to: Point) => {
    segments.push({ from, to, delay: time });
    time += gap;
  };

  // Outer hexagonal cube frame.
  add(top, upperRight);
  add(upperRight, lowerRight);
  add(lowerRight, bottom);
  add(bottom, lowerLeft);
  add(lowerLeft, upperLeft);
  add(upperLeft, top);

  time += gap * 0.75;

  // Internal cube structure. The center-to-bottom axis is part of the mark.
  add(top, center);
  add(center, bottom);
  add(upperLeft, center);
  add(upperRight, center);
  add(center, lowerLeft);
  add(center, lowerRight);

  const after = (index: number, ratio = 0.92) => segments[index].delay + duration * ratio;

  const nodes: Node[] = [
    { point: upperRight, radius: 7.4, delay: after(0) },
    { point: lowerRight, radius: 7.4, delay: after(1) },
    { point: bottom, radius: 7.4, delay: after(2) },
    { point: lowerLeft, radius: 7.4, delay: after(3) },
    { point: upperLeft, radius: 7.4, delay: after(4) },
    { point: top, radius: 7.4, delay: after(5) },
    { point: center, radius: 8.5, delay: after(6), center: true },
    { point: midLeft, radius: 5.8, delay: after(10, 0.55) },
    { point: midRight, radius: 5.8, delay: after(11, 0.55) },
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Apex & Axis"
      role="img"
    >
      <g
        stroke={color}
        strokeWidth={4.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {segments.map((segment, index) => (
          <line
            key={`segment-${index}`}
            x1={segment.from[0]}
            y1={segment.from[1]}
            x2={segment.to[0]}
            y2={segment.to[1]}
            pathLength={1}
            className={animate ? "aa-stroke" : undefined}
            style={
              animate
                ? {
                    animationDuration: `${duration}s`,
                    animationDelay: `${segment.delay}s`,
                  }
                : undefined
            }
          />
        ))}
      </g>

      <g fill={color}>
        {nodes.map((node, index) => (
          <circle
            key={`node-${index}`}
            cx={node.point[0]}
            cy={node.point[1]}
            r={node.radius}
            className={
              animate ? (node.center ? "aa-center-pulse" : "aa-node") : undefined
            }
            style={
              animate
                ? {
                    animationDelay: node.center
                      ? `${node.delay}s, ${node.delay + 0.7}s`
                      : `${node.delay}s`,
                  }
                : undefined
            }
          />
        ))}
      </g>
    </svg>
  );
}