import React from "react";
import { Progress, Card, Row, Col } from "antd";

const RiskAnalysis = ({
  risk_level_per,
  std,
  valueAtRisk1,
  market_sensitivity,
  impact,
}) => {
  // Sample risk analysis data
  const riskData = {
    riskLevel: risk_level_per, // Overall risk level based on asset volatility
    volatilityMetrics: {
      standardDeviation: std, // Standard deviation as a measure of volatility
      // Beta coefficient compared to market index
      valueAtRisk: valueAtRisk1, // Value-at-Risk (VaR) for the portfolio
    },
    sensitivity: {
      marketSensitivity: market_sensitivity, // Sensitivity of portfolio to market fluctuations
      externalFactorImpact: impact, // Impact of external factors (e.g., inflation, policy changes)
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
          <strong>
            {riskData?.riskLevel < 50
              ? "LOW"
              : riskData?.riskLevel > 50 && riskData?.riskLevel < 70
              ? "MODERATE"
              : "HIGH"}
          </strong>
        </p>
        <Progress
          percent={riskData?.riskLevel}
          status={
            riskData?.riskLevel < 50
              ? "success"
              : riskData?.riskLevel > 50 && riskData?.riskLevel < 70
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
              <strong>Value-at-Risk (VaR):</strong> Rs.{" "}
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
