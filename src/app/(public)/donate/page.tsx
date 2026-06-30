'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './donate.module.css';

const PRESETS = [5000, 10000, 25000, 50000, 100000];

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(25000);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'card'>('bank');
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');

  const getFinalAmount = () => {
    if (selectedAmount === 'custom') {
      return customAmount ? parseFloat(customAmount) : 0;
    }
    return selectedAmount;
  };

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <section className={styles.headerSection}>
        <div className={styles.headerOverlay} />
        <div className={styles.headerContent}>
          <h1>Support Our Mission</h1>
          <p>Every contribution directly funds early childhood education, micro-grants for women, and welfare outreach programs.</p>
        </div>
      </section>

      {/* Main Section */}
      <section className={styles.donateSection}>
        <div className="container">
          <div className={styles.splitLayout}>
            {/* Donation Form Card */}
            <div className={styles.formCol}>
              <div className={styles.donateCard}>
                <h3>Support Sir John Ndukwe Legacy Foundation</h3>
                <p className={styles.cardSubtitle}>Choose how often you would like to give and the amount (₦)</p>

                {/* Donation Frequency Selector */}
                <div className={styles.frequencySelector}>
                  <button
                    type="button"
                    className={`${styles.frequencyBtn} ${frequency === 'one-time' ? styles.activeFrequency : ''}`}
                    onClick={() => setFrequency('one-time')}
                  >
                    One-Time Donation
                  </button>
                  <button
                    type="button"
                    className={`${styles.frequencyBtn} ${frequency === 'monthly' ? styles.activeFrequency : ''}`}
                    onClick={() => setFrequency('monthly')}
                  >
                    Monthly Donation (Recurring)
                  </button>
                </div>

                {/* Preset Amounts */}
                <div className={styles.presetsGrid}>
                  {PRESETS.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      className={`${styles.presetBtn} ${selectedAmount === amt ? styles.activePreset : ''}`}
                      onClick={() => setSelectedAmount(amt)}
                    >
                      ₦{amt.toLocaleString('en-NG')}
                    </button>
                  ))}
                  <button
                    type="button"
                    className={`${styles.presetBtn} ${selectedAmount === 'custom' ? styles.activePreset : ''}`}
                    onClick={() => setSelectedAmount('custom')}
                  >
                    Custom
                  </button>
                </div>

                {/* Custom Amount Input */}
                {selectedAmount === 'custom' && (
                  <div className={styles.formGroup}>
                    <label htmlFor="customAmount">Enter Custom Amount (₦) *</label>
                    <input
                      type="number"
                      id="customAmount"
                      min="500"
                      placeholder="e.g., 15000"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="form-control"
                    />
                  </div>
                )}

                {/* Payment Method Tabs */}
                <div className={styles.methodTabs}>
                  <button
                    type="button"
                    className={`${styles.methodBtn} ${paymentMethod === 'bank' ? styles.activeMethod : ''}`}
                    onClick={() => setPaymentMethod('bank')}
                  >
                    Bank Transfer Details
                  </button>
                  <button
                    type="button"
                    className={`${styles.methodBtn} ${paymentMethod === 'card' ? styles.activeMethod : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    Pay Online (Card/USSD)
                  </button>
                </div>

                {/* Payment content */}
                {paymentMethod === 'bank' ? (
                  <div className={styles.bankBox}>
                    <h4>Direct Bank Transfer Instructions</h4>
                    <p>Kindly transfer your {frequency === 'monthly' ? 'monthly recurring ' : ''}donation of <strong>₦{getFinalAmount().toLocaleString('en-NG')}{frequency === 'monthly' ? ' / month' : ''}</strong> directly to our bank account below:</p>
                    
                    <div className={styles.bankDetails}>
                      <div className={styles.detailRow}>
                        <span>Bank Name:</span>
                        <strong>Access Bank Plc</strong>
                      </div>
                      <div className={styles.detailRow}>
                        <span>Account Name:</span>
                        <strong>Sir John Ndukwe Legacy Foundation</strong>
                      </div>
                      <div className={styles.detailRow}>
                        <span>Account Number:</span>
                        <strong className={styles.accNum}>1798305882</strong>
                      </div>
                    </div>

                    <p className={styles.bankTip}>
                      💡 Please include your <strong>Name</strong> and <strong>"{frequency === 'monthly' ? 'Monthly Donation' : 'Donation'}"</strong> in the reference field. 
                      Once done, you can email your transfer receipt to <strong>donate@sirjohnndukwelegacyfoundation.org</strong> to receive an official acknowledgement.
                    </p>
                  </div>
                ) : (
                  <div className={styles.onlineBox}>
                    <h4>Online Payments (Secure via Paystack)</h4>
                    <p>Make a secure online donation using your Debit Card, USSD code, or direct bank payment.</p>
                    
                    <div className={styles.paymentPreview}>
                      <span>Donation Amount:</span>
                      <strong>₦{getFinalAmount().toLocaleString('en-NG')}{frequency === 'monthly' ? ' / month' : ''}</strong>
                    </div>

                    <button
                      type="button"
                      disabled
                      className="btn btn-primary btn-block btn-lg"
                    >
                      Proceed to Pay {frequency === 'monthly' ? 'Monthly ' : ''}(Awaiting Gateway Approval)
                    </button>
                    
                    <p className={styles.gatewayDisclaimer}>
                      ⚠️ Online payment gateway integration is currently undergoing compliance checks. 
                      Please utilize the <strong>Bank Transfer</strong> option in the meantime.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Informational Column */}
            <div className={styles.infoCol}>
              <span className="section-subtitle font-secondary">Transparency & Trust</span>
              <h2 className="section-title">Where Your Money Goes</h2>
              <p className={styles.infoIntro}>
                SJN-LF operates on a 100% accountability model. We publish verified financial summaries annually, showing exactly where every Naira is spent.
              </p>

              <div className={styles.allocationItem}>
                <div className={styles.allocationPercent}>45%</div>
                <div>
                  <h4>Early Education & Nutrition</h4>
                  <p>Procuring educational packets, children's textbooks, nutritional milk, and operating mobile school vans.</p>
                </div>
              </div>

              <div className={styles.allocationItem}>
                <div className={styles.allocationPercent}>35%</div>
                <div>
                  <h4>Women Micro-Capital Seed Grants</h4>
                  <p>Funding interest-free capital pools distributed directly to women market traders and funding training materials.</p>
                </div>
              </div>

              <div className={styles.allocationItem}>
                <div className={styles.allocationPercent}>20%</div>
                <div>
                  <h4>Outreach Logistics & Medicine</h4>
                  <p>Purchasing diagnostic test kits, pharmaceutical supplies, and transporting medical volunteers to rural communities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
