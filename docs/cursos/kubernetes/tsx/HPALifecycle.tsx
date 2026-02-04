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
  red: "#ef4444",
  green: "#22c55e",
  white: "#ffffff",
  gray: "#374151",
  darkPurple: "#1e1b4b",
};

// Componente Pulso
const Pulse: React.FC<{
  progress: number;
  isHighLoad: boolean;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}> = ({ progress, isHighLoad, startX, startY, endX, endY }) => {
  const x = interpolate(progress, [0, 1], [startX, endX]);
  const y = interpolate(progress, [0, 1], [startY, endY]);
  const opacity = interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = interpolate(progress, [0, 0.5, 1], [0.5, 1.2, 0.8]);

  return (
    <div
      style={{
        position: "absolute",
        left: x - 15,
        top: y - 15,
        width: 30,
        height: 30,
        borderRadius: "50%",
        background: isHighLoad ? COLORS.red : COLORS.electricBlue,
        boxShadow: `0 0 30px ${isHighLoad ? COLORS.red : COLORS.electricBlue}`,
        opacity,
        transform: `scale(${scale})`,
      }}
    />
  );
};

// Componente Icono de Métricas
const MetricsIcon: React.FC<{ pulse: number }> = ({ pulse }) => {
  const glowIntensity = interpolate(pulse, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <div
      style={{
        position: "absolute",
        left: 100,
        top: 320,
        width: 160,
        height: 160,
        borderRadius: "50%",
        background: COLORS.darkPurple,
        border: `4px solid ${COLORS.purple}`,
        boxShadow: `0 0 ${40 * glowIntensity}px ${COLORS.purple}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ fontSize: 48 }}>⏱️</span>
      <span
        style={{
          color: COLORS.white,
          fontSize: 16,
          marginTop: 8,
          fontFamily: "system-ui",
          fontWeight: "bold",
        }}
      >
        Metrics Server
      </span>
    </div>
  );
};

// Componente HPA Central
const HPANode: React.FC<{
  isProcessing: boolean;
  currentLoad: number;
  targetLoad: number;
}> = ({ isProcessing, currentLoad, targetLoad }) => {
  const borderColor = isProcessing ? COLORS.green : COLORS.purple;

  return (
    <div
      style={{
        position: "absolute",
        left: 820,
        top: 310,
        width: 280,
        height: 180,
        borderRadius: 20,
        background: COLORS.darkPurple,
        border: `4px solid ${borderColor}`,
        boxShadow: `0 0 50px ${borderColor}50`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <span
        style={{
          color: COLORS.electricBlue,
          fontSize: 36,
          fontWeight: "bold",
          fontFamily: "system-ui",
        }}
      >
        HPA
      </span>
      <div
        style={{
          display: "flex",
          gap: 32,
          marginTop: 16,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <span
            style={{
              color: currentLoad > targetLoad ? COLORS.red : COLORS.electricBlue,
              fontSize: 28,
              fontWeight: "bold",
              fontFamily: "monospace",
            }}
          >
            {currentLoad}%
          </span>
          <div
            style={{ color: COLORS.gray, fontSize: 14, fontFamily: "system-ui" }}
          >
            Actual
          </div>
        </div>
        <div
          style={{
            width: 2,
            height: 50,
            background: COLORS.gray,
          }}
        />
        <div style={{ textAlign: "center" }}>
          <span
            style={{
              color: COLORS.green,
              fontSize: 28,
              fontWeight: "bold",
              fontFamily: "monospace",
            }}
          >
            {targetLoad}%
          </span>
          <div
            style={{ color: COLORS.gray, fontSize: 14, fontFamily: "system-ui" }}
          >
            Target
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente Deployment
const DeploymentBox: React.FC<{
  podCount: number;
  pods: { scale: number; opacity: number }[];
}> = ({ podCount, pods }) => {
  return (
    <div
      style={{
        position: "absolute",
        right: 100,
        top: 180,
        width: 420,
        height: 440,
        borderRadius: 20,
        background: `${COLORS.darkPurple}90`,
        border: `3px solid ${COLORS.purple}60`,
        padding: 24,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          color: COLORS.white,
          fontSize: 20,
          fontFamily: "system-ui",
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontWeight: "bold" }}>📦 Deployment</span>
        <span style={{ 
          color: COLORS.electricBlue,
          background: `${COLORS.electricBlue}25`,
          padding: "8px 16px",
          borderRadius: 10,
          fontSize: 18,
          fontFamily: "monospace",
          fontWeight: "bold",
        }}>
          Replicas: {podCount}
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          justifyItems: "center",
          alignItems: "center",
          padding: 8,
        }}
      >
        {pods.map((pod, i) => (
          <div
            key={i}
            style={{
              width: 100,
              height: 100,
              transform: `scale(${pod.scale})`,
              opacity: pod.opacity,
              background: `linear-gradient(135deg, ${COLORS.electricBlue}, ${COLORS.purple})`,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: pod.scale > 0.5 ? `0 0 25px ${COLORS.electricBlue}50` : "none",
            }}
          >
            <span style={{ fontSize: 48 }}>🐳</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente Stabilization Window
const StabilizationWindow: React.FC<{
  visible: boolean;
  countdown: number;
}> = ({ visible, countdown }) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        top: 530,
        padding: "16px 32px",
        background: COLORS.darkPurple,
        border: `3px solid ${COLORS.electricBlue}`,
        borderRadius: 16,
        display: "flex",
        alignItems: "center",
        gap: 16,
        boxShadow: `0 0 30px ${COLORS.electricBlue}40`,
      }}
    >
      <span style={{ fontSize: 32 }}>⏳</span>
      <span
        style={{
          color: COLORS.white,
          fontSize: 24,
          fontFamily: "monospace",
          fontWeight: "bold",
        }}
      >
        Stabilization: {countdown}s
      </span>
    </div>
  );
};

// Componente principal
export const HPALifecycle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ciclo de 8 segundos (240 frames a 30fps)
  const cycleLength = 240;
  const cycleFrame = frame % cycleLength;

  // Fases del ciclo:
  // 0-60: Carga normal, 2 pods
  // 60-120: Carga alta, escalando a 4 pods
  // 120-180: Carga baja detectada
  // 180-240: Scale down con stabilization window

  const phase = Math.floor(cycleFrame / 60);

  // Animación del pulso
  const pulseProgress = (cycleFrame % 30) / 30;

  // Calcular carga actual
  const currentLoad = interpolate(
    cycleFrame,
    [0, 60, 120, 180, 240],
    [45, 75, 80, 30, 45],
    { extrapolateRight: "clamp" }
  );

  // Calcular número de pods (escala de 3 a 9)
  const getPodCount = () => {
    if (cycleFrame < 60) return 3;  // Base: 3 pods
    if (cycleFrame < 120) return 9; // Scale up: 9 pods
    if (cycleFrame < 180) return 9; // Mantiene 9 pods
    return 3; // Scale down: vuelve a 3
  };

  const podCount = getPodCount();

  // Generar estados de pods con animación (grid 3x3)
  const generatePods = () => {
    const pods: { scale: number; opacity: number }[] = [];
    const maxPods = 9; // 3x3 grid
    const basePods = 3; // Pods iniciales

    for (let i = 0; i < maxPods; i++) {
      let scale = 0;
      let opacity = 0;

      if (i < basePods) {
        // Pods base siempre visibles (primera fila)
        scale = 1;
        opacity = 1;
      } else if (i < podCount) {
        // Pods que se escalan durante scale up
        if (cycleFrame >= 60 && cycleFrame < 180) {
          const delay = (i - basePods) * 4; // Delay escalonado
          const scaleInProgress = spring({
            frame: cycleFrame - 60 - delay,
            fps,
            config: { damping: 12 },
          });
          scale = Math.min(scaleInProgress, 1);
          opacity = Math.min(scaleInProgress, 1);
        } else if (cycleFrame >= 180) {
          // Scale down con delay inverso
          const reverseIndex = maxPods - 1 - i;
          const delay = reverseIndex * 5;
          const scaleOutProgress = interpolate(
            cycleFrame - 180 - delay,
            [0, 20],
            [1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          scale = Math.max(scaleOutProgress, 0);
          opacity = Math.max(scaleOutProgress, 0);
        }
      }

      pods.push({ scale, opacity });
    }

    return pods;
  };

  // Stabilization window
  const showStabilization = cycleFrame >= 180 && cycleFrame < 240;
  const stabilizationCountdown = showStabilization
    ? Math.ceil(interpolate(cycleFrame, [180, 240], [180, 0]))
    : 0;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #1a1a3e 100%)`,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Título */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: COLORS.white,
            fontSize: 36,
            fontWeight: "bold",
            margin: 0,
            textShadow: `0 0 30px ${COLORS.electricBlue}60`,
          }}
        >
          Ciclo de Vida del HPA
        </h1>
        <p
          style={{
            color: COLORS.purple,
            fontSize: 16,
            marginTop: 8,
          }}
        >
          Horizontal Pod Autoscaler
        </p>
      </div>

      {/* Flechas de flujo */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="12"
            markerHeight="8"
            refX="10"
            refY="4"
            orient="auto"
          >
            <polygon
              points="0 0, 12 4, 0 8"
              fill={COLORS.purple}
            />
          </marker>
          <marker
            id="arrowhead-blue"
            markerWidth="12"
            markerHeight="8"
            refX="10"
            refY="4"
            orient="auto"
          >
            <polygon
              points="0 0, 12 4, 0 8"
              fill={COLORS.electricBlue}
            />
          </marker>
        </defs>
        {/* Línea Metrics -> HPA (misma altura y=400) */}
        <path
          d="M 260 400 L 820 400"
          stroke={COLORS.purple}
          strokeWidth={4}
          fill="none"
          strokeDasharray="10,5"
          opacity={0.8}
          markerEnd="url(#arrowhead)"
        />
        {/* Línea HPA -> Deployment (misma altura y=400) */}
        <path
          d="M 1100 400 L 1440 400"
          stroke={COLORS.electricBlue}
          strokeWidth={4}
          fill="none"
          opacity={0.9}
          markerEnd="url(#arrowhead-blue)"
        />
        {/* Etiquetas de las conexiones */}
        <text x="540" y="380" fill={COLORS.gray} fontSize="16" fontFamily="system-ui" textAnchor="middle">
          Consulta métricas
        </text>
        <text x="1270" y="380" fill={COLORS.electricBlue} fontSize="16" fontFamily="system-ui" textAnchor="middle">
          Actualiza réplicas
        </text>
      </svg>

      {/* Componentes */}
      <MetricsIcon pulse={pulseProgress} />

      <Pulse
        progress={pulseProgress}
        isHighLoad={currentLoad > 50}
        startX={260}
        startY={400}
        endX={820}
        endY={400}
      />

      <HPANode
        isProcessing={phase === 1 || phase === 3}
        currentLoad={Math.round(currentLoad)}
        targetLoad={50}
      />

      <DeploymentBox podCount={podCount} pods={generatePods()} />

      <StabilizationWindow
        visible={showStabilization}
        countdown={stabilizationCountdown}
      />

      {/* Leyenda de fase */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
        }}
      >
        {["Monitoreo", "Scale Up", "Carga Baja", "Scale Down"].map((label, i) => (
          <div
            key={label}
            style={{
              padding: "20px 40px",
              background: phase === i ? COLORS.purple : COLORS.darkPurple,
              borderRadius: 16,
              border: phase === i ? `4px solid ${COLORS.electricBlue}` : `2px solid ${COLORS.purple}50`,
              color: COLORS.white,
              fontSize: 24,
              fontWeight: phase === i ? "bold" : "normal",
              opacity: phase === i ? 1 : 0.5,
              boxShadow: phase === i ? `0 0 40px ${COLORS.purple}70` : "none",
              transition: "all 0.3s",
              minWidth: 160,
              textAlign: "center" as const,
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
