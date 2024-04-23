package com.ex.ticket.ticket.repository;

import com.ex.ticket.ticket.domain.entity.TicketItem;
import com.ex.ticket.ticket.domain.entity.TicketItemStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TicketItemRepository extends JpaRepository<TicketItem, Long> {

    List<TicketItem> findAllByEventIdAndTicketItemStatus(Long eventId, TicketItemStatus status);

    Boolean existsByEventId(Long eventId);
    Optional<TicketItem> findByIdAndTicketItemStatus(Long ticketItemId, TicketItemStatus status);

}
