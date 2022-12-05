import React from 'react';
import styles from './InstructionItem.module.scss';

export default function InstructionItem({Text}) {
  return (
	<li className={styles.InstructionItem}>
		{Text}
	</li>
  )
}
