import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

// Colores de la paleta
const COLORS = {
  background: "#0a0a1a",
  electricBlue: "#00d4ff",
  purple: "#8b5cf6",
  cyan: "#06b6d4",
  orange: "#f97316",
  green: "#22c55e",
  white: "#ffffff",
  gray: "#6b7280",
  darkPurple: "#1e1b4b",
  darkBlue: "#0f172a",
};

// Pod minimalista
const Pod: React.FC<{
  size?: number;
  scale?: number;
  opacity?: number;
}> = ({ size = 60, scale = 1, opacity = 1 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${COLORS.electricBlue}, ${COLORS.purple})`,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale})`,
        opacity,
        boxShadow: `0 0 20px ${COLORS.electricBlue}40`,
      }}
    >
      <span style={{ fontSize: size * 0.5 }}>🐳</span>
    </div>
  );
};

// Sección HPA - Clonación horizontal
const HPASection: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  // Ciclo de animación
  const cycleLength = 90;
  const cycleFrame = frame % cycleLength;

  // Número de pods que se muestran
  const basePods = 2;
  const maxPods = 5;

  // Calcular cuántos pods mostrar
  const podProgress = interpolate(
    cycleFrame,
    [0, 30, 60, 90],
    [basePods, maxPods, maxPods, basePods],
    { extrapolateRight: "clamp" }
  );

  const currentPods = Math.round(podProgress);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        flex: 1,
      }}
    >
      {/* Contenedor de pods */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          justifyContent: "center",
          minHeight: 180,
          alignItems: "center",
          maxWidth: 350,
        }}
      >
        {Array.from({ length: maxPods }).map((_, i) => {
          const isVisible = i < currentPods;
          const appearFrame = i * 8;
          const podScale = isVisible
            ? spring({
                frame: cycleFrame - appearFrame,
                fps,
                config: { damping: 12 },
              })
            : 0;

          return (
            <Pod key={i} scale={Math.min(podScale, 1)} opacity={podScale} />
          );
        })}
      </div>

      {/* Flecha horizontal */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          color: COLORS.electricBlue,
          fontSize: 36,
        }}
      >
        <span>←</span>
        <span style={{ fontSize: 20, color: COLORS.gray }}>Horizontal</span>
        <span>→</span>
      </div>
    </div>
  );
};

// Sección VPA - Pod que crece
const VPASection: React.FC<{ frame: number; fps: number }> = ({ frame }) => {
  const cycleLength = 90;
  const cycleFrame = frame % cycleLength;

  // El pod crece y encoge
  const sizeMultiplier = interpolate(
    cycleFrame,
    [0, 30, 60, 90],
    [1, 1.8, 1.8, 1],
    { extrapolateRight: "clamp" }
  );

  const baseSize = 80;
  const currentSize = baseSize * sizeMultiplier;

  // Indicadores de recursos
  const cpu = interpolate(cycleFrame, [0, 30, 60, 90], [100, 250, 250, 100]);
  const memory = interpolate(cycleFrame, [0, 30, 60, 90], [128, 512, 512, 128]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        flex: 1,
      }}
    >
      {/* Pod que crece */}
      <div
        style={{
          minHeight: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: currentSize,
            height: currentSize,
            background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.purple})`,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 ${25 * sizeMultiplier}px ${COLORS.cyan}50`,
            transition: "all 0.1s ease-out",
          }}
        >
          <span style={{ fontSize: currentSize * 0.5 }}>🐳</span>
        </div>
      </div>

      {/* Indicadores de recursos */}
      <div
        style={{
          display: "flex",
          gap: 24,
          fontSize: 18,
          fontFamily: "monospace",
        }}
      >
        <div style={{ color: COLORS.green }}>
          CPU: {Math.round(cpu)}m
        </div>
        <div style={{ color: COLORS.orange }}>
          MEM: {Math.round(memory)}Mi
        </div>
      </div>

      {/* Flecha vertical */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: COLORS.cyan,
          fontSize: 32,
        }}
      >
        <span>↑</span>
        <span style={{ fontSize: 20, color: COLORS.gray }}>Vertical</span>
        <span>↓</span>
      </div>
    </div>
  );
};

// Sección Cluster Autoscaler - Nodos que se duplican
const ClusterAutoscalerSection: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const cycleLength = 90;
  const cycleFrame = frame % cycleLength;

  // Número de nodos
  const nodeProgress = interpolate(
    cycleFrame,
    [0, 30, 60, 90],
    [1, 2, 2, 1],
    { extrapolateRight: "clamp" }
  );

  const nodeCount = Math.round(nodeProgress);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        flex: 1,
      }}
    >
      {/* Nodos */}
      <div
        style={{
          display: "flex",
          gap: 20,
          minHeight: 180,
          alignItems: "center",
        }}
      >
        {Array.from({ length: 2 }).map((_, nodeIndex) => {
          const isVisible = nodeIndex < nodeCount;
          const nodeScale = isVisible
            ? spring({
                frame: cycleFrame - nodeIndex * 15,
                fps,
                config: { damping: 10 },
              })
            : 0;

          return (
            <div
              key={nodeIndex}
              style={{
                width: 140,
                height: 130,
                background: `${COLORS.darkBlue}`,
                border: `3px solid ${COLORS.orange}`,
                borderRadius: 12,
                padding: 12,
                display: "flex",
                flexDirection: "column",
                gap: 8,
                transform: `scale(${Math.min(nodeScale, 1)})`,
                opacity: nodeScale,
                boxShadow: `0 0 25px ${COLORS.orange}40`,
              }}
            >
              {/* Título del nodo */}
              <div
                style={{
                  color: COLORS.orange,
                  fontSize: 14,
                  fontFamily: "monospace",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Node {nodeIndex + 1}
              </div>
              {/* Pods dentro del nodo */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  justifyContent: "center",
                }}
              >
                {[0, 1, 2].map((podIndex) => (
                  <div
                    key={podIndex}
                    style={{
                      width: 32,
                      height: 32,
                      background: `linear-gradient(135deg, ${COLORS.electricBlue}, ${COLORS.purple})`,
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: 16 }}>🐳</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Indicador */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          color: COLORS.orange,
          fontSize: 32,
        }}
      >
        <span>🖥️</span>
        <span style={{ fontSize: 20, color: COLORS.gray }}>Cluster</span>
        <span>🖥️</span>
      </div>
    </div>
  );
};

// Panel de sección
const SectionPanel: React.FC<{
  title: string;
  subtitle: string;
  color: string;
  children: React.ReactNode;
  delay: number;
  frame: number;
  fps: number;
}> = ({ title, subtitle, color, children, delay, frame, fps }) => {
  const appearScale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15 },
  });

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 32,
        background: `${COLORS.darkPurple}80`,
        borderRadius: 20,
        border: `3px solid ${color}50`,
        transform: `scale(${Math.min(appearScale, 1)})`,
        opacity: appearScale,
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 32,
        }}
      >
        <h2
          style={{
            color,
            fontSize: 42,
            fontWeight: "bold",
            margin: 0,
            fontFamily: "system-ui",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            color: COLORS.gray,
            fontSize: 18,
            margin: "12px 0 0 0",
            fontFamily: "system-ui",
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Contenido */}
      {children}
    </div>
  );
};

// Componente principal
export const AutoscalerComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #1a1a3e 100%)`,
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: 50,
      }}
    >
      {/* Título principal */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        <h1
          style={{
            color: COLORS.white,
            fontSize: 56,
            fontWeight: "bold",
            margin: 0,
            textShadow: `0 0 50px ${COLORS.purple}70`,
          }}
        >
          Tipos de Autoscaling en Kubernetes
        </h1>
        <p
          style={{
            color: COLORS.purple,
            fontSize: 24,
            marginTop: 16,
          }}
        >
          HPA vs VPA vs Cluster Autoscaler
        </p>
      </div>

      {/* Tres secciones */}
      <div
        style={{
          display: "flex",
          gap: 32,
          flex: 1,
          alignItems: "stretch",
        }}
      >
        {/* HPA */}
        <SectionPanel
          title="HPA"
          subtitle="Horizontal Pod Autoscaler"
          color={COLORS.electricBlue}
          delay={0}
          frame={frame}
          fps={fps}
        >
          <HPASection frame={frame} fps={fps} />
        </SectionPanel>

        {/* VPA */}
        <SectionPanel
          title="VPA"
          subtitle="Vertical Pod Autoscaler"
          color={COLORS.cyan}
          delay={10}
          frame={frame}
          fps={fps}
        >
          <VPASection frame={frame} fps={fps} />
        </SectionPanel>

        {/* Cluster Autoscaler */}
        <SectionPanel
          title="CA"
          subtitle="Cluster Autoscaler"
          color={COLORS.orange}
          delay={20}
          frame={frame}
          fps={fps}
        >
          <ClusterAutoscalerSection frame={frame} fps={fps} />
        </SectionPanel>
      </div>

      {/* Footer con descripciones */}
      <div
        style={{
          display: "flex",
          gap: 32,
          marginTop: 32,
        }}
      >
        {[
          { text: "Añade más réplicas de Pods", color: COLORS.electricBlue },
          { text: "Aumenta recursos del Pod", color: COLORS.cyan },
          { text: "Añade más Nodos al cluster", color: COLORS.orange },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "20px 24px",
              background: `${item.color}20`,
              borderRadius: 12,
              border: `2px solid ${item.color}40`,
            }}
          >
            <span
              style={{
                color: item.color,
                fontSize: 20,
                fontFamily: "system-ui",
                fontWeight: "bold",
              }}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
