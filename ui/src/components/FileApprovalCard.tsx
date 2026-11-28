/** P7 and P9 approval cards: save a graph, write a project file, read a data
 * file. Each says exactly what will happen; the loop enforces the decision. */
import React from 'react';
import type { FileApprovalRequest } from '../agent/tools/types';
import type { MessageKey } from '../i18n';
import { formatBytes } from '../state/attachments';
import { ApprovalCard } from './ApprovalCard';

type T = (key: MessageKey, vars?: Record<string, string | number>) => string;

interface Props {
  request: FileApprovalRequest;
  active: boolean;
  onDecide(approved: boolean): void;
  t: T;
}

/** The danger style: replacing another graph, or a file every later prompt reads. */
export function fileApprovalDanger(request: FileApprovalRequest): boolean {
  if (request.action === 'save_graph') return request.overwrites !== null;
  if (request.action === 'project_write') return request.agentInstructions;
  return false;
}

export function FileApprovalCard({ request, active, onDecide, t }: Props) {
  const danger = fileApprovalDanger(request);
  if (request.action === 'save_graph') {
    const title = request.overwrites
      ? t('approve.save.replace.title', { name: request.name, old: request.overwrites })
      : request.inPlace ? t('approve.save.changes.title', { name: request.name }) : t('approve.save.title', { name: request.name });
    return (
      <ApprovalCard key="save" danger={danger} active={active} detailsLabel={t('approve.save.details')} title={title}
        confirmLabel={request.overwrites ? t('approve.save.replace.confirm') : t('approve.save.confirm')}
        cancelLabel={t('common.cancel')} onDecide={onDecide}>
        <p className="gcp-approval-target">{t('approve.target', { tab: request.tab })}</p>
        {request.overwrites
          ? <p className="gcp-approval-warning" role="note">{t('approve.save.replace.body', { old: request.overwrites })}</p>
          : <p className="gcp-approval-note">{request.inPlace ? t('approve.save.changes.body') : t('approve.save.body')}</p>}
      </ApprovalCard>
    );
  }
  if (request.action === 'data_read') {
    return (
      <ApprovalCard key="read" active={active} detailsLabel={t('approve.read.details')} title={t('approve.read.title', { path: request.path })}
        confirmLabel={t('approve.read.confirm')} cancelLabel={t('common.cancel')} onDecide={onDecide}>
        <p className="gcp-approval-lead"><code data-user-content>{request.path}</code>{request.size !== null ? ` · ${formatBytes(request.size)}` : ''}</p>
        <p className="gcp-approval-warning">{t('approve.read.body', { provider: request.provider })}</p>
        <p className="gcp-approval-note">{t('approve.read.note')}</p>
      </ApprovalCard>
    );
  }
  const title = request.created ? t('approve.write.create.title', { path: request.path }) : t('approve.write.change.title', { path: request.path });
  return (
    <ApprovalCard key="write" danger={danger} active={active} detailsLabel={t('approve.write.details')} title={title}
      confirmLabel={request.created ? t('approve.write.create.confirm') : t('approve.write.change.confirm')}
      cancelLabel={t('common.cancel')} onDecide={onDecide}>
      <p className="gcp-approval-facts">{formatBytes(request.bytes)}</p>
      {request.agentInstructions && <p className="gcp-approval-warning" role="note">{t('approve.write.agents')}</p>}
      {request.mods && <p className="gcp-approval-warning" role="note">{t('approve.write.mods')}</p>}
      {request.created
        ? <pre className="gcp-approval-file" aria-label={t('approve.write.content')} data-user-content>{request.content}{new TextEncoder().encode(request.content ?? '').length < request.bytes ? `\n${t('approve.write.cut')}` : ''}</pre>
        : request.diff
          ? <pre className="gcp-approval-file gcp-approval-diff" aria-label={t('approve.write.diff')} data-user-content>{request.diff.split('\n').map((line, index) => (
            <span key={index} className={line.startsWith('+ ') ? 'gcp-diff-add' : line.startsWith('- ') ? 'gcp-diff-del' : line.startsWith('@@') ? 'gcp-diff-fold' : undefined}>{line}{'\n'}</span>
          ))}</pre>
          : <p className="gcp-approval-note">{t('approve.write.noDiff')}</p>}
      <p className="gcp-approval-note">{t('approve.write.note')}</p>
    </ApprovalCard>
  );
}
