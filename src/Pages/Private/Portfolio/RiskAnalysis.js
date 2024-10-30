import React from "react";
import { Progress, Card, Row, Col } from "antd";

const RiskAnalysis = () => {
  // Sample risk analysis data
  const riskData = {
    riskLevel: "Medium", // Overall risk level based on asset volatility
    volatilityMetrics: {
      standardDeviation: "12.5%", // Standard deviation as a measure of volatility
      betaCoefficient: "1.2", // Beta coefficient compared to market index
      valueAtRisk: "Rs. 50,000", // Value-at-Risk (VaR) for the portfolio
    },
    sensitivity: {
      marketSensitivity: "Moderate", // Sensitivity of portfolio to market fluctuations
      externalFactorImpact: "Low", // Impact of external factors (e.g., inflation, policy changes)
    },
  };

  return (
    <div className="risk-analysis-section">
      <h2 className="accordion-title">Risk Analysis</h2>

      {/* Risk Level Indicator */}
      <Card className="risk-level-card">
        <h3>Risk Level Indicator</h3>
        <p>
          Based on your holdings, your overall risk level is:{" "}
          <strong>{riskData.riskLevel}</strong>
        </p>
        <Progress
          percent={
            riskData.riskLevel === "Low"
              ? 30
              : riskData.riskLevel === "Medium"
              ? 60
              : 90
          }
          status={
            riskData.riskLevel === "Low"
              ? "success"
              : riskData.riskLevel === "Medium"
              ? "active"
              : "exception"
          }
        />
      </Card>

      {/* Volatility Metrics */}
      <Card className="volatility-metrics-card">
        <h3>Volatility Metrics</h3>
        <Row gutter={16}>
          <Col span={8}>
            <div className="metric-item">
              <strong>Standard Deviation:</strong>{" "}
              {riskData.volatilityMetrics.standardDeviation}
            </div>
          </Col>
          <Col span={8}>
            <div className="metric-item">
              <strong>Beta Coefficient:</strong>{" "}
              {riskData.volatilityMetrics.betaCoefficient}
            </div>
          </Col>
          <Col span={8}>
            <div className="metric-item">
              <strong>Value-at-Risk (VaR):</strong>{" "}
              {riskData.volatilityMetrics.valueAtRisk}
            </div>
          </Col>
        </Row>
      </Card>

      {/* Asset Sensitivity */}
      <Card className="asset-sensitivity-card">
        <h3>Asset Sensitivity</h3>
        <Row gutter={16}>
          <Col span={12}>
            <div className="sensitivity-item">
              <strong>Market Sensitivity:</strong>{" "}
              {riskData.sensitivity.marketSensitivity}
            </div>
          </Col>
          <Col span={12}>
            <div className="sensitivity-item">
              <strong>External Factor Impact:</strong>{" "}
              {riskData.sensitivity.externalFactorImpact}
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default RiskAnalysis;
